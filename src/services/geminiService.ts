import { GoogleGenAI, Type } from "@google/genai";
import { ADUConfig, SolarNeeds, CommercialNeeds, UserLocation } from "../types";
import { regionalKnowledge, globalConstants } from "../data/businessKnowledge";

// 使用 Paid tier 提供的 Gemini 3 Flash 模型
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getADUConsultation = async (config: ADUConfig, location: UserLocation) => {
  const regionKey = location.region in regionalKnowledge ? location.region : 'Default';
  const regionData = regionalKnowledge[regionKey];
  
  const activeAddons = Object.entries(config.addons)
    .filter(([_, active]) => active)
    .map(([name]) => {
      if (name === 'zonalComfort') return 'Luxury Radiant Heating (Secondary Zonal Comfort)';
      if (name === 'energyIndependence') return 'Net-Zero Energy Bundle (Solar & Storage)';
      if (name === 'smartSecurity') return 'Whole-Home Intelligence (Smart Home Suite)';
      return name;
    })
    .join(", ");

  const prompt = `
    SYSTEM INSTRUCTION: 
    You are the Senior Sales Architect for ${globalConstants.companyName}. 
    The client is in ${location.city}, ${location.region}.
    
    GOAL: Provide a high-conversion, professional summary of building specs. 
    Make it punchy, clear, and easy to understand at a glance.

    USER CONFIGURATION:
    - Size: ${config.size}
    - Add-ons: ${activeAddons || 'Standard Build'}
    - Regional Context: ${regionData.codes}

    TASK:
    Generate exactly 5 high-impact "Core Specifications" that increase purchase intent.
    - Each bullet must be concise (max 15 words).
    - Focus on: Zoning compliance, Net-metering/Solar, Ontario Building Code (OBC), Incentives, and Durability (winter-ready).
    - If "Luxury Radiant Heating" is selected, emphasize the integrated radiant floor heating for bathrooms and living areas.
    - Use DOUBLE-PANE windows (no triple-pane).
    - Ensure tone is authoritative but simple.
    - Summary field should be empty as it is no longer displayed.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      seed: 42, 
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING, description: 'Keep this empty' },
          recommendations: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Exactly 5 punchy core specifications'
          },
          estimatedCostRange: { type: Type.STRING },
        },
        required: ['summary', 'recommendations', 'estimatedCostRange']
      }
    }
  });

  return JSON.parse(response.text);
};

// 更新后的 Solar 咨询逻辑，支持 Multi-unit 和 Commercial 专项分析
export const getSolarConsultation = async (needs: SolarNeeds | CommercialNeeds, location: UserLocation, isCommercial: boolean) => {
  const regionKey = location.region in regionalKnowledge ? location.region : 'Default';
  const regionData = regionalKnowledge[regionKey];

  // 提取针对商业/多单元的专项财务逻辑
  const multiUnitInfo = isCommercial && regionData.multiUnitStrategy 
    ? `Commercial/Multi-Unit Context: ${regionData.multiUnitStrategy.incentives}. Technical Focus: ${regionData.multiUnitStrategy.technicalFocus}.` 
    : '';

  const prompt = `Act as an expert Canadian renewable energy consultant for ${globalConstants.companyName}.
  Client Location: ${location.city}, ${location.region}.
  Project Type: ${isCommercial ? 'Commercial Solar / Multi-Unit' : 'Residential Solar'}.
  Local Context: ${regionData.incentives}.
  ${multiUnitInfo}
  Analysis Input: ${JSON.stringify(needs)}.
  Hardware Base: ${globalConstants.smartTech.energy}.
  
  TASK:
  Provide a professional energy transition roadmap. 
  1. System size optimized for Canadian latitude and facility type.
  2. Financial payback: ${isCommercial ? 'Emphasize CCA Class 43.1 tax write-offs' : 'Focus on Greener Homes Loan'}.
  3. ROI Estimate in CAD including long-term protection against rate hikes.
  
  Keep the summary field concise and the recommendations list to exactly 4 items.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          estimatedCostRange: { type: Type.STRING },
          roiEstimate: { type: Type.STRING },
        },
        required: ['summary', 'recommendations', 'estimatedCostRange', 'roiEstimate']
      }
    }
  });

  return JSON.parse(response.text);
};
