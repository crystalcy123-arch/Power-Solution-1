import React, { useState, useMemo, useEffect } from 'react';
import { getADUConsultation } from '../services/geminiService';
import { ADUConfig, AIResponse, UserLocation } from '../types';
import { regionalKnowledge } from '../data/businessKnowledge';

interface ADUSectionProps {
  location: UserLocation;
}

const SuccessModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-center text-slate-900 mb-4 font-heading">Success!</h3>
        <p className="text-slate-600 text-center leading-relaxed mb-8">
          Your design session request has been submitted. Our architectural team will contact you shortly to discuss your project.
        </p>
        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
        >
          Got it, thanks!
        </button>
      </div>
    </div>
  );
};

const ADUSection: React.FC<ADUSectionProps> = ({ location }) => {
  const [config, setConfig] = useState<ADUConfig>({
    size: 'studio',
    intendedUse: 'rental',
    addons: {
      energyIndependence: false,
      smartSecurity: false,
      carbonNeutral: false,
      zonalComfort: false
    }
  });
  
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [openHighlight, setOpenHighlight] = useState<number | null>(null);

  const activeRegion = useMemo(() => {
    return location.region in regionalKnowledge ? location.region : 'ON';
  }, [location.region]);

  const rentalIncome = useMemo(() => {
    const pricing = regionalKnowledge[activeRegion].aduPricing;
    switch (config.size) {
      case 'studio': return pricing.studio.rentalEstimate;
      case '1-bedroom': return pricing.oneBed.rentalEstimate;
      case '2-bedroom': return pricing.twoBed.rentalEstimate;
      default: return '$0';
    }
  }, [config.size, activeRegion]);

  const basePrice = useMemo(() => {
    const pricing = regionalKnowledge[activeRegion].aduPricing;
    switch (config.size) {
      case 'studio': return pricing.studio.basePrice;
      case '1-bedroom': return pricing.oneBed.basePrice;
      case '2-bedroom': return pricing.twoBed.basePrice;
      default: return '$0';
    }
  }, [config.size, activeRegion]);

  const policyLink = useMemo(() => {
    return (regionalKnowledge[activeRegion] || regionalKnowledge['Default']).policyUrl;
  }, [activeRegion]);

  const toggleAddon = (key: keyof ADUConfig['addons']) => {
    setConfig(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [key]: !prev.addons[key]
      }
    }));
  };

  const handleBookSession = async () => {
    if (!contact.email || !contact.name) {
      alert("Please provide at least your name and email.");
      return;
    }

    setIsSubmitting(true);
    const activeAddonsList = Object.entries(config.addons)
      .filter(([_, active]) => active)
      .map(([name]) => name.replace(/([A-Z])/g, ' $1').trim())
      .join(", ") || "None";

    const formData = {
      projectType: 'ADU Design Session',
      customerName: contact.name,
      customerEmail: contact.email,
      customerPhone: contact.phone,
      aduSize: config.size,
      basePrice: basePrice,
      rentalEstimate: rentalIncome,
      addons: activeAddonsList,
      city: location.city,
      province: activeRegion
    };

    try {
      const response = await fetch("https://formspree.io/f/xpqjrjyz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setContact({ name: '', email: '', phone: '' });
      } else {
        throw new Error("Submission failed");
      }
    } catch (err) {
      alert("Something went wrong. Please try again or contact crystalsli@outlook.com directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const highlights = [
    {
      title: "1. Built Better, Built Faster (The Smart Shell)",
      intro: "Forget traditional \"sticks and bricks.\" We use an advanced Structural Panel System that acts like a high-performance cooler for your home.",
      specs: [
        { label: "Maximum Warmth", text: "It keeps heat in during Ontario winters and out during the summer, far exceeding standard building rules." },
        { label: "Lower Bills", text: "Our precision-sealed walls reduce energy leaks by up to 40%, so you aren't paying to heat the outdoors." },
        { label: "Quiet & Quick", text: "We build the main structure in just a few days, so you can start renting it out (or moving in) much sooner." }
      ]
    },
    {
      title: "2. The Hybrid Comfort System",
      intro: "We use a \"two-stage\" approach to keeping you comfortable—combining power with precision.",
      specs: [
        { label: "The Workhorse", text: "A high-efficiency heat pump does the heavy lifting, keeping the air perfect year-round." },
        { label: "The Luxury", text: "We add Heated Floors in bathrooms and living areas for that cozy, silent warmth that feels premium." },
        { label: "Smart Design", text: "You get the most efficient heating for the lowest possible cost." }
      ]
    },
    {
      title: "3. A Roof That Works for You",
      intro: "Our signature \"Mono-Slope\" roof isn't just for looks—it’s the engine of the house.",
      specs: [
        { label: "Sun-Powered", text: "Sloped at the perfect angle for the Niagara region to catch every bit of sunlight for your solar panels." },
        { label
