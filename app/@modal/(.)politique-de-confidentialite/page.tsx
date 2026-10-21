import { PrivacyDrawer } from "@/components/privacy/PrivacyDrawer";
import { PrivacyPolicy } from "@/components/privacy/PrivacyPolicy";
import { privacyPolicy } from "@/content/privacy";

export default function PrivacyPolicyDrawer() {
  return (
    <PrivacyDrawer title={privacyPolicy.title} closeLabel={privacyPolicy.closeLabel}>
      <PrivacyPolicy idPrefix="politique-tiroir" />
    </PrivacyDrawer>
  );
}
