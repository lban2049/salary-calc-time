/**
 * v0 by Vercel.
 * @see https://v0.dev/t/ZnbqAqBm2Uq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <Card className="w-full max-w-md mx-auto mt-9">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your income and work details.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="monthly-salary">Monthly Salary</Label>
          <Input id="monthly-salary" type="number" placeholder="Enter your monthly salary" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="monthly-bonus">Monthly Bonus (Optional)</Label>
          <Input id="monthly-bonus" type="number" placeholder="Enter your monthly bonus" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="daily-work-hours">Daily Work Hours</Label>
          <Input id="daily-work-hours" type="number" placeholder="Enter your daily work hours" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="weekly-work-days">Weekly Work Days</Label>
          <Input id="weekly-work-days" type="number" placeholder="Enter your weekly work days" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hourly-rate">Hourly Rate</Label>
          <Input id="hourly-rate" type="number" placeholder="Calculated hourly rate" readOnly />
        </div>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full">
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  )
}