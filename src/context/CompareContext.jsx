import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const CompareContext = createContext();

export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};

export const CompareProvider = ({ children }) => {
  const [comparedPlans, setComparedPlans] = useState([]);

  // Load compared plans from sessionStorage on init
  useEffect(() => {
    const saved = sessionStorage.getItem('compared_plans');
    if (saved) {
      try {
        setComparedPlans(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading compared plans', e);
      }
    }
  }, []);

  const savePlans = (plans) => {
    setComparedPlans(plans);
    sessionStorage.setItem('compared_plans', JSON.stringify(plans));
  };

  const addToCompare = (plan) => {
    if (comparedPlans.some((p) => p.id === plan.id)) {
      toast.info('Plan is already added to comparison.', { id: `info-${plan.id}` });
      return;
    }
    if (comparedPlans.length >= 3) {
      toast.warning('You can compare a maximum of 3 plans at a time. Remove an existing plan first.', { id: 'warn-limit' });
      return;
    }
    const updated = [...comparedPlans, plan];
    savePlans(updated);
    toast.success(`${plan.name} added to comparison.`, { id: `success-${plan.id}` });
  };

  const removeFromCompare = (planId) => {
    const planToRemove = comparedPlans.find((p) => p.id === planId);
    const updated = comparedPlans.filter((p) => p.id !== planId);
    savePlans(updated);
    if (planToRemove) {
      toast.info(`${planToRemove.name} removed from comparison.`, { id: `remove-${planId}` });
    }
  };

  const clearCompare = () => {
    savePlans([]);
    toast.info('Cleared comparison list.');
  };

  return (
    <CompareContext.Provider
      value={{
        comparedPlans,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};
