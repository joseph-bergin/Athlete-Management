import { Button } from "@/components/ui/button";

export function HeroSection() {
    return (<>
        {/* Hero */}
        <div className="relative overflow-hidden py-24 lg:py-32">
            {/* Gradients */}
            <div
                aria-hidden="true"
                className="flex absolute -top-96 start-1/2 transform -translate-x-1/2"
            >
                <div className="bg-gradient-to-tl from-primary-foreground to-background blur-xl w-[100rem] h-[50rem] origin-top-left -rotate-12 -translate-x-[10rem]"/>
            </div>
            {/* End Gradients */}
            <div className="relative z-10 flex justify-center">
                <div className="container py-10 lg:py-16">
                    <div className="max-w-2xl text-center mx-auto">
                        <p className="">Elevate your Performance</p>
                        <div className="mt-5 max-w-2xl">
                            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                                Athlete Management System
                            </h1>
                        </div>
                        {/* End Title */}
                        <div className="mt-5 max-w-3xl">
                            <p className="text-xl text-muted-foreground">
                                A powerful and flexible athlete management system that helps
                                you manage your team, club, or organization with ease.
                            </p>
                        </div>
                        {/* Buttons */}
                        <div className="mt-8 gap-3 flex justify-center">
                            <Button size={"lg"}>Get started</Button>
                            <Button size={"lg"} variant={"outline"}>
                                Learn more
                            </Button>
                        </div>
                        {/* End Buttons */}
                    </div>
                </div>
            </div>
        </div>
        {/* End Hero */}
    </>);
}