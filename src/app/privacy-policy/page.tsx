import clsx from "clsx";
import Balancer from "react-wrap-balancer";

export default function PrivacyPolicyPage() {
  return (
    <div
      className={clsx(
        "bg-black lg:bg-[url(/gradient.svg)] dark:lg:bg-[url(/gradient-dark-2.svg)]",
        "flex flex-col justify-center items-center p-8 w-screen min-h-screen text-black bg-white dark:text-white dark:bg-black"
      )}
      style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 px-6 text-black bg-white rounded-xl shadow sm:p-12 lg:m-8 dark:text-white dark:bg-black">
        <article className="p-8 mx-auto space-y-4 max-w-3xl leading-relaxed text-justify md:text-lg md:rounded-xl">
          <div className="flex justify-center items-center w-full">
            <Balancer className="mx-auto w-full text-center">
              <h1 className="mb-6 w-full text-4xl font-bold sm:text-5xl">
                Privacy Policy
              </h1>
            </Balancer>
          </div>
          <p>
            We respect your privacy and are committed to protecting your
            personal data. This privacy policy explains how we collect, use, and
            protect your personal data in connection with your use of our
            website.
          </p>
          <h2 className="text-2xl font-bold">Information We Collect</h2>
          <p>
            We may collect anonymous usage data about your visit to our website,
            including the pages you view, the links you click, and other actions
            you take. This information is collected through cookies and other
            tracking technologies and is used to analyze and improve the
            performance of our website.
          </p>
          <h2 className="text-2xl font-bold">How We Use Your Information</h2>
          <p>
            We use the anonymous usage data that we collect to run statistics
            and analyze the performance of our website. This information helps
            us to understand how visitors use our website and to make
            improvements to the user experience.
          </p>
          <p>
            We do not collect any personally identifiable information (PII) or
            sensitive data about our website visitors. We do not share your
            personal data with any third parties, except as required by law.
          </p>
          <h2 className="text-2xl font-bold">Your Rights</h2>
          <p>
            You have the right to access, correct, and delete your personal data
            that we have collected. You can also object to the processing of
            your personal data or request that we restrict the processing of
            your personal data. To exercise these rights, please contact us
            using the contact information provided below.
          </p>
          <h2 className="text-2xl font-bold">Contact Us</h2>
          <p>
            If you have any questions or concerns about our privacy policy or
            the collection and processing of your personal data, please contact
            us at{" "}
            <a
              href="mailto:privacy@raycast-music.app"
              className="hover:underline text-brand"
            >
              privacy@raycast-music.app
            </a>
            .
          </p>
        </article>
      </div>
    </div>
  );
}
