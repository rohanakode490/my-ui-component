import * as React from 'react';

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative mx-auto border-zinc-800 dark:border-zinc-800 bg-zinc-800 border-[12px] rounded-[2.5rem] h-[480px] w-[270px] shadow-2xl overflow-hidden flex flex-col'>
      {/* Speaker and Camera notch */}
      <div className='absolute top-0 left-1/2 transform -translate-x-1/2 h-5 w-32 bg-zinc-800 rounded-b-2xl z-30 flex items-center justify-center gap-2'>
        <div className='w-12 h-1 bg-zinc-900 rounded-full' />
        <div className='w-2.5 h-2.5 bg-zinc-950 rounded-full border border-zinc-800' />
      </div>

      {/* Top status bar */}
      <div className='absolute top-0 inset-x-0 h-6 px-5 pt-1.5 flex justify-between text-[10px] font-semibold text-zinc-400 z-20 pointer-events-none select-none'>
        <span>9:41</span>
        <div className='flex items-center gap-1'>
          <span>📶</span>
          <span>5G</span>
          <span className='ml-0.5'>🔋</span>
        </div>
      </div>

      {/* Main screen area */}
      <div className='flex-1 bg-zinc-50 dark:bg-zinc-900 pt-6 pb-4 overflow-y-auto relative flex flex-col justify-center items-center'>
        {children}
      </div>

      {/* Home indicator bar */}
      <div className='absolute bottom-1.5 left-1/2 transform -translate-x-1/2 h-1 w-24 bg-zinc-400 dark:bg-zinc-600 rounded-full z-20' />
    </div>
  );
}
