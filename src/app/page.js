"use client";

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PURcsF9aMqq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { HOURLY_WAGE } from "@/lib/constant";

export default function Component() {
  // 是否显示结果
  const [showResult, setShowResult] = useState(false);

  // 时薪
  const [hourlyWage, setHourlyWage] = useState(100.0);
  useEffect(() => {
    const saveHorylyWage = localStorage.getItem(HOURLY_WAGE);
    if (saveHorylyWage) {
      setHourlyWage(parseFloat(saveHorylyWage));
    }
  }, []);

  // 用户输入的价格
  const [price, setPrice] = useState("");

  // 计算时间
  const [needHours, setNeedHours] = useState(0);
  const calculateTime = () => {
    if (price === 0) {
      return 0;
    }
    setNeedHours(Math.ceil((price / hourlyWage) * 10) / 10);
    setShowResult(true);
  };

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="max-w-xl space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            How long do you need to work to afford that?
          </h1>
          <p className="text-muted-foreground md:text-xl">
            Discover the true cost of that item in terms of your hard-earned
            wages. Enter the price below and let us calculate the time you need
            to work to pay for it.
          </p>
          <div className="bg-muted/50 p-4 rounded-lg text-center">
            <p className="text-sm font-medium">
              Your hourly wage:{" "}
              <span className="text-primary">${hourlyWage.toFixed(2)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              You can update your hourly wage in the{" "}
              <Link href="/setting" className="underline" prefetch={false}>
                Settings
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
        <div className="mt-8 w-full max-w-md space-y-4">
          <div className="relative">
            <Input
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              type="number"
              placeholder="Enter item price"
              className="pr-20 pl-4 py-3 rounded-lg w-full border border-input bg-background"
            />
            <Button
              className="absolute right-0 top-0 h-10 px-4 rounded-lg bg-primary text-primary-foreground font-medium"
              onClick={calculateTime}
            >
              Calculate
            </Button>
          </div>
          {showResult && (
            <div className="bg-muted/50 p-4 rounded-lg text-center">
              <p className="text-2xl font-bold">
                You need to work for{" "}
                <span className="text-primary">{needHours} hours </span>
                to afford this item.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
