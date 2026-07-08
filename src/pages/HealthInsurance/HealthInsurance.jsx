import React, { useState, useMemo } from 'react';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import plansData from '../../data/plans.json';
import companiesData from '../../data/companies.json';
import citiesData from '../../data/cities.json';
import InsuranceCard from '../../components/cards/InsuranceCard';
import { Filter, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

const HealthInsurance = () => {
  // Sidebar states
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const [coverageFilter, setCoverageFilter] = useState('All');
  const [ageFilter, setAgeFilter] = useState(35);
  const [csrFilter, setCsrFilter] = useState('All');
  const [waitingFilter, setWaitingFilter] = useState('All');
  const [roomRentFilter, setRoomRentFilter] = useState('All');
  const [cashlessOnly, setCashlessOnly] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const breadcrumbItems = [{ label: 'All Plans', path: '/health-insurance' }];

  // Reset all filters helper
  const handleResetFilters = () => {
    setSelectedCompanies([]);
    setCoverageFilter('All');
    setAgeFilter(35);
    setCsrFilter('All');
    setWaitingFilter('All');
    setRoomRentFilter('All');
    setCashlessOnly(false);
  };

  const handleCompanyToggle = (companyId) => {
    if (selectedCompanies.includes(companyId)) {
      setSelectedCompanies(selectedCompanies.filter((id) => id !== companyId));
    } else {
      setSelectedCompanies([...selectedCompanies, companyId]);
    }
  };

  // Filter plans dynamically based on variables
  const filteredPlans = useMemo(() => {
    return plansData.filter((plan) => {
      // 1. Company filter
      if (selectedCompanies.length > 0 && !selectedCompanies.includes(plan.companyId)) {
        return false;
      }
      // 2. Coverage filter
      if (coverageFilter !== 'All' && plan.coverage !== coverageFilter) {
        return false;
      }
      // 3. Claim Settlement Ratio filter
      const csrNum = parseFloat(plan.claimRatio);
      if (csrFilter === '98' && csrNum < 98) return false;
      if (csrFilter === '96' && csrNum < 96) return false;
      if (csrFilter === '94' && csrNum < 94) return false;

      // 4. Waiting Period filter
      if (waitingFilter !== 'All' && plan.waitingPeriod !== waitingFilter) {
        return false;
      }
      // 5. Room rent limit filter
      if (roomRentFilter !== 'All' && plan.roomRent !== roomRentFilter) {
        return false;
      }

      // Filter out senior plans if age entered is low, or vice versa
      const age = parseInt(ageFilter);
      if (age < 50 && plan.categories.includes('senior') && !plan.categories.includes('individual')) {
        return false;
      }
      if (age >= 60 && !plan.categories.includes('senior')) {
        return false;
      }

      return true;
    });
  }, [selectedCompanies, coverageFilter, ageFilter, csrFilter, waitingFilter, roomRentFilter]);

  const coverageOptions = ['All', '5 Lakhs', '10 Lakhs', '15 Lakhs', '25 Lakhs', '50 Lakhs', '1 Crore'];
  const waitingOptions = ['All', '0 Years', '1 Year', '2 Years', '3 Years'];
  const roomRentOptions = ['All', 'No Limit', 'Single Private Room', 'Shared Room Limit'];

  return (
    <>
      <SEO
        title="Compare Health Insurance Plans online"
        description="Compare health policies, filter by sum insured, age limit, claim settlement ratio, and cashless network empanelled clinics. Buy directly on WhatsApp."
        keywords="health policy search, cashless hospital filters, best health plan comparison, securehealth"
        path="/health-insurance"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-6">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumb items={breadcrumbItems} />
          <h1 className="font-display font-extrabold text-2xl md:text-3xl text-dark mt-2">
            All Health Insurance Plans
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">
            Filter, compare, and consult our advisor to find the best plan fit for your requirements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Desktop Sidebar Filters */}
          <aside className="lg:col-span-3 bg-white border border-slate-100 rounded-3xl p-6 space-y-6 sticky top-28 hidden lg:block shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-display font-bold text-dark flex items-center gap-1.5 text-base">
                <Filter className="w-4 h-4 text-primary" />
                Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-primary font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Age selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700 uppercase tracking-wide">
                <span>Eldest Member Age</span>
                <span className="text-primary font-extrabold">{ageFilter} Yrs</span>
              </div>
              <input
                type="range"
                min="18"
                max="75"
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Insurance Companies Checkbox list */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Insurance Provider
              </span>
              <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
                {companiesData.map((comp) => (
                  <label
                    key={comp.id}
                    className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-dark cursor-pointer font-medium"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCompanies.includes(comp.id)}
                      onChange={() => handleCompanyToggle(comp.id)}
                      className="rounded text-primary focus:ring-primary/20 w-4.5 h-4.5 border-slate-200"
                    />
                    <span>{comp.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Coverage Limit dropdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Desired Cover
              </span>
              <select
                value={coverageFilter}
                onChange={(e) => setCoverageFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer bg-white"
              >
                {coverageOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'All' ? 'All Coverages' : `₹${opt}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Claim Settlement Ratio filter */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Claim Settled Ratio
              </span>
              <select
                value={csrFilter}
                onChange={(e) => setCsrFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer bg-white"
              >
                <option value="All">All Settlement Ratios</option>
                <option value="98">98% and Above</option>
                <option value="96">96% and Above</option>
                <option value="94">94% and Above</option>
              </select>
            </div>

            {/* Waiting Period dropdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Waiting Period (Pre-existing)
              </span>
              <select
                value={waitingFilter}
                onChange={(e) => setWaitingFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer bg-white"
              >
                {waitingOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'All' ? 'Any Waiting Period' : opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Room Rent dropdown */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                Room Rent Limit
              </span>
              <select
                value={roomRentFilter}
                onChange={(e) => setRoomRentFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary cursor-pointer bg-white"
              >
                {roomRentOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt === 'All' ? 'Any Room Rent Limit' : opt}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          {/* Mobile filter buttons */}
          <div className="lg:hidden flex items-center justify-between bg-white border border-slate-100 p-4 rounded-2xl shadow-sm mb-4">
            <span className="text-xs font-bold text-slate-500">
              Showing {filteredPlans.length} Matching Plans
            </span>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="px-4 py-2 bg-primary text-white font-semibold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Filter className="w-3.5 h-3.5" />
              Adjust Filters
            </button>
          </div>

          {/* Plan listing columns */}
          <main className="lg:col-span-9 space-y-6">
            <div className="hidden lg:flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Matching Plans Available: {filteredPlans.length}
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/50">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                Direct WhatsApp Redirections
              </span>
            </div>

            {filteredPlans.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredPlans.map((plan) => (
                  <InsuranceCard key={plan.id} plan={plan} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl p-8 max-w-xl mx-auto shadow-sm">
                <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <h3 className="font-display font-bold text-dark text-lg mb-2">No Plans Match Your Filters</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6">
                  Try adjusting the elder member age, clearing sum insured parameters, or reducing the number of insurance provider checkboxes.
                </p>
                <Button onClick={handleResetFilters} variant="primary" size="md">
                  Clear All Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Drawer filter slides */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-[280px] bg-white p-6 shadow-2xl overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-display font-bold text-dark text-base flex items-center gap-1.5">
                  <Filter className="w-4 h-4 text-primary" />
                  Filters
                </span>
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-slate-400 hover:text-primary font-bold flex items-center gap-1 cursor-pointer"
                >
                  Reset
                </button>
              </div>

              {/* Mobile Age slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>ELD ELDEST MEMBER AGE</span>
                  <span className="text-primary font-extrabold">{ageFilter} Yrs</span>
                </div>
                <input
                  type="range"
                  min="18"
                  max="75"
                  value={ageFilter}
                  onChange={(e) => setAgeFilter(e.target.value)}
                  className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Mobile Companies */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Providers
                </span>
                <div className="space-y-2 max-h-[140px] overflow-y-auto">
                  {companiesData.map((comp) => (
                    <label key={comp.id} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        checked={selectedCompanies.includes(comp.id)}
                        onChange={() => handleCompanyToggle(comp.id)}
                        className="rounded text-primary focus:ring-primary/20 w-4 h-4 border-slate-200"
                      />
                      <span>{comp.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Coverages */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Desired Cover
                </span>
                <select
                  value={coverageFilter}
                  onChange={(e) => setCoverageFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  {coverageOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt === 'All' ? 'All Coverages' : `₹${opt}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Mobile CSR */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
                  Settlement Ratio
                </span>
                <select
                  value={csrFilter}
                  onChange={(e) => setCsrFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold bg-white"
                >
                  <option value="All">All Settlement Ratios</option>
                  <option value="98">98% and Above</option>
                  <option value="96">96% and Above</option>
                  <option value="94">94% and Above</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold text-xs rounded-xl shadow-md mt-6"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HealthInsurance;
