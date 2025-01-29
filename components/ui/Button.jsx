'use client';
import * as React from 'react';


export default function Button({ children }) {

    return (
        <button className='bg-[#a20c0c96] w-full py-2 text-white rounded-md !h-[70px] text-[32px] hover:bg-[#a20c0c ]'>
            {children}
        </button>
    );
}
