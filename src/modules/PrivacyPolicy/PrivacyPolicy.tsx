const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <h1 className="text-3xl font-semibold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mt-8 space-y-4">
          <p className="leading-7">
            This Privacy Policy explains how EliteCron collects, uses, and protects your
            information. If you do not agree with this policy, please do not use the
            service.
          </p>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Information we collect</h2>
            <ul className="list-disc pl-6 leading-7 text-muted-foreground">
              <li>Account / profile information you provide (e.g. a username).</li>
              <li>Monitor configuration and status data needed to run the service.</li>
              <li>Basic usage and diagnostics to keep the app reliable and secure.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">How we use information</h2>
            <ul className="list-disc pl-6 leading-7 text-muted-foreground">
              <li>To provide and improve monitoring features.</li>
              <li>To troubleshoot issues and prevent abuse.</li>
              <li>To communicate important service updates when necessary.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Data retention</h2>
            <p className="leading-7 text-muted-foreground">
              We retain data only as long as needed to operate the service and meet legal
              obligations. You can request deletion of your data where applicable.
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="leading-7 text-muted-foreground">
              If you have questions, contact us at <span className="font-medium">support@elitecron.local</span>.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
