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
  // 已更新：添加了 'multi-unit' 和 'others'
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

export type MainCategory = 'home' | 'solar';
