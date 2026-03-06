export interface UserLocation {
  city: string;
  region: string;
  country: string;
  isDetected: boolean;
}

export interface ADUConfig {
  size: 'studio' | '1-bedroom' | '2-bedroom';
  intendedUse: 'rental' | 'family' | 'office' | 'guest-house';
  addons: {
    energyIndependence: boolean;
    smartSecurity: boolean;
    carbonNeutral: boolean;
    zonalComfort: boolean;
  };
}

export interface SolarNeeds {
  monthlyBill: number;
  roofType: string;
  energyPriority: 'savings' | 'independence' | 'environment';
}

export interface CommercialNeeds {
  // 支持商业太阳能的多样化设施类型
  facilityType: 'industrial' | 'office' | 'retail' | 'multi-unit' | 'farm' | 'others';
  squareFootage: number;
  primaryGoal: 'cost-reduction' | 'esg-compliance' | 'energy-resilience';
  monthlyBill?: number;
  postalCode?: string;
  notes?: string;
}

export interface AIResponse {
  // 支撑双向 AI 报告逻辑的核心接口
  summary: string;
  recommendations: string[];
  estimatedCostRange: string;
  roiEstimate?: string;
}

/**
 * 已更新：包含 'adu' 和 'gallery'
 * 顺序对应导航栏：Home -> Solar -> ADU Design -> Gallery
 */
export type MainCategory = 'home' | 'solar' | 'adu' | 'gallery';
