"use client"

import Script from 'next/script'

const CalendlyForm = ({ type }: { type?: string }) => {
    const username = process.env.NEXT_PUBLIC_CALENDLY_USERNAME;
    const showDetails: number = process.env.NEXT_PUBLIC_CALENDLY_SHOW_DETAILS == "false" ? 1 : 0;
    const showCookies: number = process.env.NEXT_PUBLIC_CALENDLY_SHOW_COOKIES == "false" ? 1 : 0;

    return (
        <>
            <div className="calendly-inline-widget w-screen h-screen" data-url={`https://calendly.com/${username}${type ? `/${type}` : ''}?hide_landing_page_details=${showDetails}&hide_gdpr_banner=${showCookies}`}></div>

            <Script type="text/javascript" src="https://assets.calendly.com/assets/external/widget.js" async />
        </>
    )
}

export default CalendlyForm