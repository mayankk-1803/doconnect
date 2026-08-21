import React, { useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import hospitalsData from '../../data/hospitals.json';
import citiesData from '../../data/cities.json';
import companiesData from '../../data/companies.json';
import HospitalCard from '../../components/cards/HospitalCard';
import { Search, MapPin, Hospital, ShieldCheck, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

const Hospitals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedInsurer, setSelectedInsurer] = useState('All');

  const breadcrumbItems = [{ label: 'Network Hospitals', path: '/hospitals' }];

  // Reset filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All');
    setSelectedInsurer('All');
  };

  // Filter hospitals dynamically
  const filteredHospitals = useMemo(() => {
    return hospitalsData.filter((hosp) => {
      // 1. Search Query filter (name or address)
      const matchesSearch =
        hosp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hosp.address.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. City filter
      const matchesCity = selectedCity === 'All' || hosp.city === selectedCity;

      // 3. Insurer accepted filter
      const matchesInsurer =
        selectedInsurer === 'All' || hosp.insurers.includes(selectedInsurer);

      return matchesSearch && matchesCity && matchesInsurer;
    });
  }, [searchQuery, selectedCity, selectedInsurer]);

  const cityOptions = citiesData.map((c) => c.name);
  const insurerOptions = companiesData.map((c) => c.name);

  return (
    <>
      <SEO
        title="Search Cashless Network Hospitals"
        description="Search cashless health insurance network hospitals in your city. Filter empanelled hospitals by location and insurance companies."
        keywords="network hospital list, cashless hospitalization, empanelled clinics"
        path="/hospitals"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark mt-2">
            10,000+ Cashless Network Hospitals
          </h1>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl mt-1.5">
            Locate empanelled hospitals in your city that offer direct cashless admission and discharge processing for your health plan.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search & Filter Panel */}
        <div className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-sm mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hospital name or area..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition rounded-2xl text-sm"
              />
            </div>

            {/* City Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition rounded-2xl text-sm cursor-pointer bg-white"
              >
                <option value="All">All Cities</option>
                {cityOptions.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Insurer Selector */}
            <div className="md:col-span-3">
              <select
                value={selectedInsurer}
                onChange={(e) => setSelectedInsurer(e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition rounded-2xl text-sm cursor-pointer bg-white"
              >
                <option value="All">All Insurance Providers</option>
                {insurerOptions.map((ins) => (
                  <option key={ins} value={ins}>
                    {ins}
                  </option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Results Columns */}
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3.5 flex justify-between items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
            <span>Hospitals Found: {filteredHospitals.length}</span>
            <span className="inline-flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-500/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              Empanelled Network list
            </span>
          </div>

          {filteredHospitals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHospitals.map((hosp) => (
                <HospitalCard key={hosp.id} hospital={hosp} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
              <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="font-display font-bold text-dark text-lg mb-2">No Hospitals Match Your Query</h3>
              <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                Try clearing the search query keyword or resetting city and participating insurer selectors.
              </p>
              <Button onClick={handleResetFilters} variant="primary" size="md">
                Reset All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Hospitals;
