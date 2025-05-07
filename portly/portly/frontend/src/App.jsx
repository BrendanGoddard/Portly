import React from 'react';
import SummaryGenerator from './SummaryGenerator';

export default function App() {
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Portly - AI Client Updates</h1>
      <SummaryGenerator />
    </div>
  );
}