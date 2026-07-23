import { useState, type ReactNode } from "react";
import { getProductsForStep, steps } from "../../data/catalog";
import { getSelectedCount } from "../../lib/pricing";
import { useCartStore } from "../../state/cartStore";
import type { StepIcon } from "../../types/catalog";
import { CameraIcon } from "../icons/CameraIcon";
import { GridIcon } from "../icons/GridIcon";
import { SensorIcon } from "../icons/SensorIcon";
import { ShieldIcon } from "../icons/ShieldIcon";
import { ProductCard } from "./ProductCard";
import { StepHeader } from "./StepHeader";

const stepIcons: Record<StepIcon, ReactNode> = {
  camera: <CameraIcon />,
  shield: <ShieldIcon />,
  sensor: <SensorIcon />,
  grid: <GridIcon />,
};

export function Accordion() {
  const [openStepIndex, setOpenStepIndex] = useState(0);
  const lines = useCartStore((s) => s.lines);

  return (
    <div className="overflow-hidden md:rounded-t-[10px] bg-surface">
      {steps.map((step, index) => {
        const isOpen = openStepIndex === index;
        const products = getProductsForStep(step.id);
        const selectedCount = getSelectedCount(lines, step);
        const isLast = index === steps.length - 1;

        return (
          <section key={step.id}>
            <StepHeader
              stepNumber={index + 1}
              totalSteps={steps.length}
              title={step.title}
              icon={stepIcons[step.icon]}
              selectedCount={selectedCount}
              isOpen={isOpen}
              onToggle={() =>
                setOpenStepIndex((current) => (current === index ? -1 : index))
              }
            />

            {isOpen ? (
              <div className="md:rounded-b-[10px]  bg-surface-muted px-2.5 pb-5 pt-2 md:px-5">
                <div className="flex flex-wrap justify-center gap-3.25">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="w-full md:w-[calc((100%-26px)/3)] lg:w-[calc((100%-13px)/2)]"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>

                {step.nextLabel && !isLast ? (
                  <div className="mt-5 flex justify-center md:mt-6">
                    <button
                      type="button"
                      onClick={() => setOpenStepIndex(index + 1)}
                      className="flex h-9.75 items-center justify-center gap-2.5 rounded-[7px] border border-primary bg-surface-muted px-6 py-1.25 text-[18px] font-semibold text-primary transition hover:border-primary hover:bg-primary-soft"
                    >
                      {step.nextLabel}
                    </button>
                  </div>
                ) : null}
              </div>
            ) : null}
          </section>
        );
      })}
    </div>
  );
}
