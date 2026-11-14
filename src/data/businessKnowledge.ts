export interface RegionData {
  basePriceMultiplier: number;
  currency: string;
  codes: string;
  incentives: string;
  policyUrl: string;
  // 新增：针对多单元住宅与商业太阳能的专项策略
  multiUnitStrategy?: {
    incentives: string;
    technicalFocus: string;
    financialBenefit: string;
  };
}

export const regionalKnowledge: Record<string, RegionData> = {
  ON: {
    basePriceMultiplier: 1.0,
    currency: "CAD",
    codes: "Compliance with local zoning and building standards for secondary suites.",
    incentives: "Qualifies for the Canada Greener Homes Grant and local secondary suite incentives.",
    policyUrl: "https://www.ontario.ca/page/add-second-unit-your-house",
    // 安大略省 Multi-unit 专项逻辑
    multiUnitStrategy: {
      incentives: "CCA Class 43.1 - 100% first-year tax write-off for solar equipment.",
      technicalFocus: "Net-metering integration for common area loads (elevators, lighting).",
      financialBenefit: "Reduces operating expenses (OPEX) and improves building ESG rating."
    }
  },
  BC: {
    basePriceMultiplier: 1.1,
    currency: "CAD",
    codes: "BC Building Code Step Code Level 3 minimum standards.",
    incentives: "CleanBC Better Homes rebates and municipal clean energy programs.",
    policyUrl: "https://www.bchousing.org/housing-assistance/secondary-suite",
    // BC省 Multi-unit 专项逻辑
    multiUnitStrategy: {
      incentives: "PST exemptions on renewable energy equipment and strata-specific grants.",
      technicalFocus: "Virtual net-metering for multi-tenant billing distribution.",
      financialBenefit: "Direct increase in property appraisal value for strata corporations."
    }
  },
  Default: {
    basePriceMultiplier: 1.0,
    currency: "CAD",
    codes: "National Building Code of Canada (NBC) framing and insulation standards.",
    incentives: "Federal Greener Homes Loan eligibility (up to $40,000 interest-free).",
    policyUrl: "https://natural-resources.canada.ca/energy-efficiency/homes/canada-greener-homes-initiative/24831",
    multiUnitStrategy: {
      incentives: "Federal tax incentives for clean energy equipment investments.",
      technicalFocus: "Modular solar scaling for various multi-unit configurations.",
      financialBenefit: "Energy independence and long-term protection against utility rate hikes."
    }
  }
};

export const globalConstants = {
  companyName: "Power Solution Canada",
  materials: [
    "Sustainably harvested Canadian CLT and timber framing",
    "High-performance double-pane low-E glass vistas",
    "Architectural metal roofing and thermally treated wood cladding",
    "Eco-certified mineral wool insulation (R-32+)",
    "Silent air-source climate control systems"
  ],
  smartTech: {
    security: "Integrated perimeter monitoring and smart entry systems",
    energy: "Net-metering ready solar arrays with modular mounting",
    automation: "Whole-home environmental sensors and detection suite"
  }
};
