import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useVariantImgsStore = create(
    persist(
        (set) => ({
            variantImgsSrc: null,
            setVariantImgsSrc: (variantImgsSrc) => set({ variantImgsSrc }),
        }),
        {
            name: "variant-img-store", // Key for localStorage
        }
    )
);

export default useVariantImgsStore
