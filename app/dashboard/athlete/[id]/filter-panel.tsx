'use client'

import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const filterForm = z.object({
    date: z.object({
        from: z.date().optional(),
        to: z.date().optional()
    }).optional(),
    conditional: z.array(z.object({
        column: z.string(),
        operator: z.string()
    }))
})

export function FilterPanel() {

    const form = useForm<z.infer<typeof filterForm>>({
        resolver: zodResolver(filterForm),
        defaultValues: {
            date: {
                from: undefined,
                to: undefined
            },
            conditional: []
        }
    })

    function onSubmit(data: z.infer<typeof filterForm>) {
        console.log(data)
    }

    return (
        <Card className="w-fit h-full">
            <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Filter the athlete's data.</CardDescription>
            </CardHeader>

            <Form {...form}>
                <form>
                    <CardContent>
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="block">Date Range</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[300px] pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    {field.value?.from ? (
                                                        field.value?.to ? (
                                                            <>
                                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                                {format(field.value.to, "LLL dd, y")}
                                                            </>
                                                        ) : (
                                                            format(field.value.from, "LLL dd, y")
                                                        )
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                initialFocus
                                                mode="range"
                                                defaultMonth={field.value?.from}
                                                selected={field.value ? { from: field.value.from, to: field.value.to } : undefined}
                                                onSelect={field.onChange}
                                                numberOfMonths={2}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormDescription>Show results between selected dates</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit">Set Filters</Button>
                    </CardFooter>
                </form>
            </Form>
        </Card>
    )
}
