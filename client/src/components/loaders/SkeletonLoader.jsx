import React from 'react';

/**
 * Pulse effect skeleton templates for UI transitions
 */
export const PlanSkeleton = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm animate-pulse flex flex-col justify-between h-[420px]">
      <div>
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded-full w-24" />
              <div className="h-3 bg-slate-200 rounded-full w-32" />
            </div>
          </div>
          <div className="h-6 bg-slate-200 rounded-lg w-16" />
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-2xl p-3 bg-slate-50 mt-6">
          <div className="h-8 bg-slate-200 rounded-xl" />
          <div className="h-8 bg-slate-200 rounded-xl" />
          <div className="h-8 bg-slate-200 rounded-xl" />
        </div>

        <div className="space-y-3 mt-6">
          <div className="h-3 bg-slate-200 rounded-full w-5/6" />
          <div className="h-3 bg-slate-200 rounded-full w-2/3" />
          <div className="h-3 bg-slate-200 rounded-full w-3/4" />
        </div>
      </div>

      <div className="border-t border-slate-100 pt-5 mt-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <div className="h-2 bg-slate-200 rounded-full w-14" />
            <div className="h-5 bg-slate-200 rounded-full w-28" />
          </div>
          <div className="h-8 bg-slate-200 rounded-xl w-20" />
        </div>
        <div className="h-10 bg-slate-200 rounded-2xl w-full" />
      </div>
    </div>
  );
};

export const HospitalSkeleton = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm animate-pulse flex flex-col justify-between h-[340px]">
      <div>
        <div className="flex gap-2 mb-4">
          <div className="h-5 bg-slate-200 rounded-lg w-12" />
          <div className="h-5 bg-slate-200 rounded-lg w-28" />
        </div>
        <div className="h-5 bg-slate-200 rounded-full w-5/6 mb-3" />
        <div className="h-3 bg-slate-200 rounded-full w-2/3 mb-4" />
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <div className="h-2 bg-slate-200 rounded-full w-1/3" />
          <div className="flex gap-1.5">
            <div className="h-5 bg-slate-200 rounded-lg w-14" />
            <div className="h-5 bg-slate-200 rounded-lg w-14" />
            <div className="h-5 bg-slate-200 rounded-lg w-14" />
          </div>
        </div>
      </div>
      <div className="flex gap-2 border-t border-slate-100 pt-4">
        <div className="h-9 bg-slate-200 rounded-xl flex-1" />
        <div className="h-9 bg-slate-200 rounded-xl flex-1" />
      </div>
    </div>
  );
};

export const BlogSkeleton = () => {
  return (
    <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden animate-pulse flex flex-col justify-between h-[400px]">
      <div className="aspect-video bg-slate-200 w-full" />
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="h-3 bg-slate-200 rounded-full w-16" />
            <div className="h-3 bg-slate-200 rounded-full w-16" />
          </div>
          <div className="h-5 bg-slate-200 rounded-full w-5/6" />
          <div className="h-3 bg-slate-200 rounded-full w-11/12" />
          <div className="h-3 bg-slate-200 rounded-full w-3/4" />
        </div>
        <div className="border-t border-slate-100 pt-4 flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-200" />
            <div className="h-3 bg-slate-200 rounded-full w-14" />
          </div>
          <div className="h-3 bg-slate-200 rounded-full w-16" />
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <PlanSkeleton key={i} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
