export interface UserLocation {
  city: string;
  region: string;
  country: string;
  isDetected: boolean;
}

export type MainCategory = 'home' | 'solar' | 'adu' | 'gallery';

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
