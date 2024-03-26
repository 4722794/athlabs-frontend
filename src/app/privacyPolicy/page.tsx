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
                Privacy Policy
              </h1>

              <p className="mb-5 text-white/70">
                This Privacy Policy ("Policy") sets forth how Athlabs, located
                at 4132, Prestige Shantiniketan, Hoodi, Bangalore 560048, India
                ("Company"), handles the personal data of its users in relation
                to the services provided by the Athlabs app. The app offers
                AI-driven analysis of exercise performance through user-uploaded
                videos.
              </p>

              <h2 className="text-xl font-bold mb-2 text-white/80">
                1. Personal Data and Anonymity
              </h2>

              <p className="mb-5 text-white/70">
                "Personal Data" refers to any information that can directly or
                indirectly identify you. However, it is essential to clarify
                that while using Athlabs, your facial features and other
                identifiable markers in the videos are processed in such a way
                that your identity is not revealed. Our AI algorithms focus on
                analyzing your movement and exercise form, not on identifying or
                storing personal facial or bodily features.
              </p>

              <h2 className="text-xl font-bold mb-2 text-white/80">
                2. Use of Videos for App Improvement
              </h2>

              <p className="mb-2 text-white/70">
                When you upload a video to Athlabs, the app analyzes your
                exercise performance, providing instant, instructive feedback.
                This process involves capturing and processing video data to
                evaluate your movements and offer personalized exercise
                guidance.
              </p>
              <p className="mb-2 text-white/70">
                The videos you upload may be used internally to improve the
                functionality and performance of the Athlabs app. By using our
                service, you consent to the use of your video data in this
                manner. These uses include enhancing the AI’s accuracy and
                responsiveness, developing new features and services, and
                conducting research and development to better understand
                exercise patterns and performance.
              </p>
              <p className="mb-5 text-white/70">
                Although your videos are used to enhance our app, they are
                processed in a way that anonymizes any personal identification
                information. Faces and other identifiable features are obscured
                or removed to ensure privacy while retaining the data necessary
                for performance analysis.
              </p>

              <h2 className="text-xl font-bold mb-2 text-white/80">
                3. Consent and Rights
              </h2>
              <p className="mb-2 text-white/70">
                By using Athlabs, you explicitly consent to the collection,
                processing, and use of your anonymized video data as described
                in this Policy. You have the right to withdraw your consent at
                any time, but this may affect the functionality of the services
                provided to you.
              </p>
              <p className="mb-5 text-white/70">
                You retain the right to inquire about the personal data we hold
                about you and to request the deletion or correction of any
                incorrect or outdated data.
              </p>

              <h2 className="text-xl font-bold mb-2 text-white/80">
                4. Data Usage and Protection
              </h2>
              <p className="mb-5 text-white/70">
                We take stringent measures to ensure the security and
                confidentiality of your data. The use of your video data is
                strictly confined to the purposes outlined in this Policy, and
                we implement robust security protocols to prevent unauthorized
                access or misuse of your data.
              </p>

              <h2 className="text-xl font-bold mb-2 text-white/80">
                5. Changes to the Policy
              </h2>
              <p className="mb-5 text-white/70">
                We reserve the right to modify this Privacy Policy at any time.
                Any changes will be communicated through the app or via email,
                and continued use of the service after such changes constitutes
                acceptance of the new terms.
              </p>

              <h2 className="text-xl font-bold mb-2 text-white/80">
                Contact Information
              </h2>
              <p className="mb-2 text-white/70">
                For any inquiries or concerns regarding this Privacy Policy,
                please contact us at:
              </p>
              <ul className="list-disc list-inside mb-4 text-white/80">
                <li>Name: Hargun Singh Oberoi</li>
                <li>Email: hargun@sportshaala.com</li>
                <li>
                  Address: 4132, Prestige Shantiniketan, Hoodi, Bangalore
                  560048, India
                </li>
                <li>Telephone: +91 7775978497</li>
              </ul>
              <p className="mb-5 text-white/70">
                Effective Date: 24th March 2024
              </p>
            </div>
          </div>
        </div>
      </LandingLayout>
    </>
  );
}

export default PrivacyPolicy;
