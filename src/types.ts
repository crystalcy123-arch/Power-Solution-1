export interface UserLocation {
  city: string;
  region: string;
  country: string;
  isDetected: boolean; // 补全此属性以修复 App.tsx 状态初始化报错
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
  // 支持商业太阳能及储能的多样化设施类型
  facilityType: 'industrial' | 'office' | 'retail' | 'multi-unit' | 'farm' | 'others';
  squareFootage: number;
  primaryGoal: 'cost-reduction' | 'esg-compliance' | 'energy-resilience';
  monthlyBill?: number;
  postalCode?: string;
  notes?: string;
}

export interface AIResponse {
  summary: string;
  recommendations: string[];
  estimatedCostRange: string;
  roiEstimate?: string;
}

/**
 * 已更新：包含 'adu' 以支持导航切换并修复编译错误
 * 同时将 'solar' 更新为 'solar & BESS' 以匹配右上角标题更改需求
 */
export type MainCategory = 'home' | 'solar & BESS' | 'adu' | 'gallery';
