"use client";
import LandingLayout from "../layout/LandingLayout";

function PrivacyPolicy() {
  const footerClass = "!relative";

  return (
    <>
      <LandingLayout showButton={false} footerClass={footerClass}>
        <div className="bg-[#04080f] pt-20 2xl:pt-24">
          <div className="container mx-auto self-center px-6 md:px-8 flex justify-between items-center">
            <div className=" pt-6">
              <h1 className="text-3xl font-bold mb-4 text-white/80  ">
                Terms and Conditions
              </h1>

              <div className=" pt-6">
                <h2 className="text-xl font-bold text-white/80  mb-4">
                  1. Definitions
                </h2>
                <ol className="list-decimal_ list-inside_ text-white/80 ">
                  <li className="mb-2">
                    1.1 {"Athlabs"} refers to the AI-driven digital performance
                    coach application that provides instant, instructive
                    feedback based on exercise performance through handheld
                    videos.
                  </li>
                  <li className="mb-2">
                    1.2 {"User"} or {"You"} means any individual who uses the
                    Services provided by Athlabs.
                  </li>
                  <li className="mb-2">
                    1.3 {"Services"} encompasses all software, applications,
                    content, and features provided through Athlabs.
                  </li>
                  <li className="mb-2">
                    1.4 {"Content"} includes but is not limited to videos, text,
                    images, user feedback, and performance data.
                  </li>
                  <li className="mb-2">
                    1.5 {"Account"} means the registration and user profile
                    created to access the Services provided by Athlabs.
                  </li>
                </ol>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  2. Acceptance of Terms
                </h2>
                <p className="text-white/80 mb-4">
                  2.1 By accessing or using Athlabs, You agree to be bound by
                  these Terms and Conditions. If you disagree with any part of
                  the terms, then you do not have permission to access the
                  Service.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  3. User Account
                </h2>
                <p className="text-white/80 mb-4">
                  3.1 To access certain features of Athlabs, You may be required
                  to create an Account. You must provide accurate and complete
                  information and keep your Account information updated.
                </p>
                <p className="text-white/80 mb-4">
                  3.2 You are responsible for maintaining the confidentiality of
                  your Account and password, including but not limited to the
                  restriction of access to your computer and/or Account.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  4. Use of the Services
                </h2>
                <p className="text-white/80 mb-4">
                  4.1 Athlabs grants You a personal, non-transferable, and
                  non-exclusive right and license to use the software provided
                  as part of the Services.
                </p>
                <p className="text-white/80 mb-4">
                  4.2 You agree not to use the Services for any purpose that is
                  illegal or prohibited by these Terms.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  5. User-Generated Content
                </h2>
                <p className="text-white/80 mb-4">
                  5.1 You retain all rights in, and are solely responsible for,
                  the Content you post to Athlabs.
                </p>
                <p className="text-white/80 mb-4">
                  5.2 By posting Content to Athlabs, You grant Athlabs a
                  worldwide, non-exclusive, royalty-free license to use, modify,
                  publicly perform, publicly display, reproduce, and distribute
                  such Content on and through the Services.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  6. Intellectual Property
                </h2>
                <p className="text-white/80 mb-4">
                  6.1 The Services and its original content, features, and
                  functionality are and will remain the exclusive property of
                  Athlabs and its licensors.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  7. Disclaimers
                </h2>
                <p className="text-white/80 mb-4">
                  7.1 Your use of the Services is at your sole risk. The
                  Services are provided on an "AS IS" and "AS AVAILABLE" basis.
                </p>
                <p className="text-white/80 mb-4">
                  7.2 Athlabs does not warrant that a) the Services will
                  function uninterrupted, secure, or available at any particular
                  time or location; b) any errors or defects will be corrected;
                  c) the Services are free of viruses or other harmful
                  components.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  8. Limitation of Liability
                </h2>
                <p className="text-white/80 mb-4">
                  8.1 In no event shall Athlabs, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential, or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from your
                  access to or use of or inability to access or use the
                  Services.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  9. Amendments to Terms
                </h2>
                <p className="text-white/80 mb-4">
                  9.1 Athlabs reserves the right to modify or replace these
                  Terms at any time at its sole discretion.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  10. Termination
                </h2>
                <p className="text-white/80 mb-4">
                  10.1 Athlabs may terminate or suspend your access immediately,
                  without prior notice or liability, for any reason whatsoever,
                  including without limitation if You breach the Terms.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  11. Governing Law
                </h2>
                <p className="text-white/80 mb-4">
                  11.1 These Terms shall be governed and construed in accordance
                  with the laws of the jurisdiction of "Athlabs'" registration,
                  without regard to its conflict of law provisions.
                </p>

                <h2 className="text-xl font-bold text-white/80  mb-4 mt-8">
                  12. Changes
                </h2>
                <p className="text-white/80 mb-4">
                  12.1 We reserve the right, at our sole discretion, to modify
                  or replace these Terms at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </LandingLayout>
    </>
  );
}

export default PrivacyPolicy;
