import React from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import Button from '../../components/ui/Button';
import { redirectToWhatsApp } from '../../utils/whatsapp';
import { Car, ShieldCheck, Zap, HelpCircle, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';
import citiesData from '../../data/cities.json';

const Motor = () => {
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
      vehicleType: 'Car',
      regNumber: '',
      vehicleModel: '',
      city: ''
    }
  });

  const breadcrumbItems = [{ label: 'Motor Insurance', path: '/motor' }];

  const onSubmit = (data) => {
    toast.loading('Preparing your motor quote...', { id: 'motor-quote-toast' });
    
    setTimeout(() => {
      toast.update('motor-quote-toast', {
        render: 'Redirecting to WhatsApp for quotes...',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
      // Custom WhatsApp message
      const text = `Hello,

I'm interested in a Motor Insurance Plan.

Name: ${data.name}
Mobile: ${data.mobile}
Vehicle Type: ${data.vehicleType}
Registration No: ${data.regNumber || 'N/A'}
Model/Year: ${data.vehicleModel || 'N/A'}
City: ${data.city}

Please share the best available options.`;
      
      const phone = '919876543210';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      reset();
    }, 1200);
  };

  const vehicleOptions = [
    { value: 'Car', label: 'Car Insurance' },
    { value: 'Bike', label: 'Bike/Two-Wheeler Insurance' },
    { value: 'Commercial', label: 'Commercial Vehicle Insurance' }
  ];

  const cityOptions = citiesData.map((c) => ({
    value: c.name,
    label: c.name
  }));

  return (
    <>
      <SEO
        title="Motor Insurance - Car & Bike Coverage online"
        description="Protect your vehicle against accidents, theft, and third-party liabilities. Compare car and bike plans instantly and secure quotes via WhatsApp."
        keywords="car insurance, bike insurance, motor third party cover"
        path="/motor"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Motor Insurance
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Get comprehensive coverage for your car or bike. Protect against damages, theft, and natural disasters with zero paperwork and instant policies.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Car className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-snug">
              Why Buy Motor Insurance from SecureHealth?
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Cashless Garages Network</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Access cashless repair services at 5,000+ top workshops and multi-brand garages across India.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Zero-Depreciation Add-on</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Avoid out-of-pocket costs on plastic and rubber spare parts replacement during claims.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center shrink-0">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">No Claim Bonus Protection</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Protect your accumulated NCB discounts (up to 50%) even if you make a minor claim during the year.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display font-extrabold text-dark text-xl mb-1">
              Motor Quote Request
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

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Mobile Number"
                  type="tel"
                  placeholder="9876543210"
                  {...register('mobile', {
                    required: 'Mobile is required',
                    pattern: {
                      value: /^[6-9]\d{9}$/,
                      message: 'Invalid mobile number'
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
                label="Vehicle Type"
                options={vehicleOptions}
                {...register('vehicleType')}
              />

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Registration Number"
                  placeholder="e.g. MH-12-AB-1234"
                  {...register('regNumber', { required: 'Registration number required' })}
                  error={errors.regNumber}
                />
                
                <InputField
                  label="Make & Model Year"
                  placeholder="e.g. Honda City 2024"
                  {...register('vehicleModel', { required: 'Vehicle model required' })}
                  error={errors.vehicleModel}
                />
              </div>

              <SelectField
                label="City of Registration"
                options={cityOptions}
                placeholder="Select City"
                {...register('city', { required: 'City is required' })}
                error={errors.city}
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                disabled={isSubmitting}
                className="mt-6"
              >
                {isSubmitting ? 'Processing...' : 'Get Instant Quote'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Motor;
