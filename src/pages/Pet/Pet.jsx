import React from 'react';
import { useForm } from 'react-hook-form';
import SEO from '../../components/common/SEO';
import Breadcrumb from '../../components/common/Breadcrumb';
import InputField from '../../components/forms/InputField';
import SelectField from '../../components/forms/SelectField';
import Button from '../../components/ui/Button';
import { redirectToWhatsApp } from '../../utils/whatsapp';
import { PawPrint, ShieldCheck, Heart, AlertTriangle, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

const Pet = () => {
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
      petName: '',
      petType: 'Dog',
      petAge: '',
      petBreed: ''
    }
  });

  const breadcrumbItems = [{ label: 'Pet Insurance', path: '/pet' }];

  const onSubmit = (data) => {
    toast.loading('Preparing pet quote...', { id: 'pet-quote-toast' });
    
    setTimeout(() => {
      toast.update('pet-quote-toast', {
        render: 'Redirecting to WhatsApp for quotes...',
        type: 'success',
        isLoading: false,
        autoClose: 3000
      });
      // Custom WhatsApp message
      const text = `Hello,

I'm interested in a Pet Insurance Plan.

Name: ${data.name}
Mobile: ${data.mobile}
Pet Type: ${data.petType}
Pet Name: ${data.petName || 'N/A'}
Pet Age: ${data.petAge || 'N/A'} Years
Pet Breed: ${data.petBreed || 'N/A'}

Please share the best available plans.`;
      
      const phone = '919876543210';
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      reset();
    }, 1200);
  };

  const petTypeOptions = [
    { value: 'Dog', label: 'Dog/Canine' },
    { value: 'Cat', label: 'Cat/Feline' }
  ];

  return (
    <>
      <SEO
        title="Pet Insurance - Health Plans for Dogs & Cats"
        description="Protect your pets against vet surgery costs, illness diagnoses, and accidental injuries. Compare pet insurance and purchase on WhatsApp."
        keywords="pet insurance, dog health insurance, cat medical cover"
        path="/pet"
      />

      <div className="bg-slate-50 border-b border-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <Breadcrumb items={breadcrumbItems} />
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-dark leading-tight">
              Pet Insurance
            </h1>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-2xl">
              Secure your furry companion's health. Cover expensive veterinary surgical costs, medications, and third-party damages under a flexible premium plan.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-end">
            <div className="w-20 h-20 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <PawPrint className="w-10 h-10" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column Copy */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl text-dark leading-snug">
              Why Buy Pet Insurance?
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Vet Fee & Treatment Coverage</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Reimburses medical expenditures on doctor consults, medications, diagnostic tests, and operations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Third-Party Liability Cover</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Protects you against legal and medical costs if your pet causes accidental injury or damage to third-party properties.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-dark text-base">Missing & Theft Cover</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Provides coverage for advertising campaigns or reward money costs if your pet goes missing or is stolen.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className="font-display font-extrabold text-dark text-xl mb-1">
              Pet Quote Request
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

              <div className="grid grid-cols-2 gap-4">
                <SelectField
                  label="Pet Type"
                  options={petTypeOptions}
                  {...register('petType')}
                />
                
                <InputField
                  label="Pet Name"
                  placeholder="e.g. Bruno"
                  {...register('petName', { required: 'Pet name required' })}
                  error={errors.petName}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="Pet Breed"
                  placeholder="e.g. Golden Retriever"
                  {...register('petBreed', { required: 'Pet breed required' })}
                  error={errors.petBreed}
                />
                
                <InputField
                  label="Pet Age (Years)"
                  type="number"
                  placeholder="e.g. 2"
                  {...register('petAge', { required: 'Pet age required' })}
                  error={errors.petAge}
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
                {isSubmitting ? 'Processing...' : 'Get Pet Quote'}
              </Button>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default Pet;
