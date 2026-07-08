import React from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import Button from '../../components/ui/Button';
import { redirectToWhatsApp } from '../../utils/whatsapp';
import { Plane, ShieldCheck, Calendar, HelpCircle, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

const Travel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
      destination: 'Europe',
      travelDates: '',
      travelersCount: '1'
    }
  });

  const breadcrumbItems = [{ label: 'Travel Insurance', path: '/travel' }];

  const onSubmit = (data) => {
    toast.loading('Preparing travel quote...', { id: 'travel-quote-toast' });
    
    setTimeout(() => {
      toast.update('travel-quote-toast', {
        render: 'Redirecting to WhatsApp for quotes...',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
      // Custom WhatsApp message
      const text = `Hello,

I'm interested in a Travel Insurance Plan.

Name: ${data.name}
Mobile: ${data.mobile}
Destination: ${data.destination}
Dates / Duration: ${data.travelDates || 'N/A'}
Number of Travelers: ${data.travelersCount}

Please share the best options.`;
      
      const phone = '919876543210';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      reset();
    }, 1200);
  };

  const destinationOptions = [
    { value: 'USA & Canada', label: 'USA & Canada' },
    { value: 'Europe', label: 'Europe (Schengen)' },
    { value: 'Asia & Middle East', label: 'Asia & Middle East' },
    { value: 'Worldwide (excl USA/Canada)', label: 'Worldwide (excl USA/Canada)' },
    { value: 'Domestic India', label: 'Domestic India Travel' }
  ];

  const travelerCountOptions = [
    { value: '1', label: '1 Traveler' },
    { value: '2', label: '2 Travelers' },
    { value: '3-4', label: '3-4 Travelers (Family)' },
    { value: '5+', label: 'Group Travel (5+)' }
  ];

  return (
    <>
      <SEO
        title="Travel Insurance - International & Domestic Plans"
        description="Secure your travel against medical emergencies, flight cancellations, and baggage loss. Compare travel plans instantly and purchase on WhatsApp."
        keywords="travel insurance, Schengen visa insurance, flight delay cover"
        path="/travel"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Travel Insurance
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Secure your travel against unexpected flight delays, medical emergencies, passport losses, and luggage delays. Travel with absolute peace of mind.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-500">
              <Plane className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-snug">
              Comprehensive Travel Protection Clauses
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Emergency Medical Expenses</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Covers cashless hospitalization and surgical costs incurred during travels overseas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Flight Delays & Cancellations</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Reimburses costs of meals, lodging, and tickets if flights are canceled or delayed past 6 hours.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Baggage & Passport Losses</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Provides coverage buffers to apply for emergency replacement documents and purchases of essential toiletries.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display font-extrabold text-dark text-xl mb-1">
              Travel Quote Builder
            </h3>
            <p className="text-slate-500 text-xs mb-6">
              Takes less than 60 seconds. Opens WhatsApp instantly.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <InputField
                label="Full Name"
                placeholder="Rahul Sharma"
                {...register('name', { required: 'Name is required' })}
                error={errors.name}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Mobile Number"
                  type="tel"
                  placeholder="9876543210"
                  {...register('mobile', {
                    required: 'Mobile is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Invalid Indian mobile number'
                    }
                  })}
                  error={errors.mobile}
                />
                
                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="rahul@gmail.com"
                  {...register('email', { required: 'Email is required' })}
                  error={errors.email}
                />
              </div>

              <SelectField
                label="Destination Category"
                options={destinationOptions}
                {...register('destination')}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Travel Dates / Duration"
                  placeholder="e.g. 15 Jul to 30 Jul"
                  {...register('travelDates', { required: 'Dates are required' })}
                  error={errors.travelDates}
                />
                
                <SelectField
                  label="Number of Travelers"
                  options={travelerCountOptions}
                  {...register('travelersCount')}
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? 'Processing...' : 'Get Travel Quote'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Travel;
