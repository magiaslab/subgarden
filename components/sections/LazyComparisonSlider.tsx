'use client';

import dynamic from 'next/dynamic';

const ComparisonSlider = dynamic(
  () => import('./ComparisonSlider').then((mod) => ({ default: mod.ComparisonSlider })),
  {
    loading: () => (
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  }
);

export { ComparisonSlider };
