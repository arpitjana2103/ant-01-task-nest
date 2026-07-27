import { OrganizationList } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function CreateOrganizationPage() {
    await auth.protect();
    return (
        <OrganizationList
            hidePersonal
            afterSelectOrganizationUrl={"/organization/:id"}
            afterCreateOrganizationUrl={"/organization/:id"}
        />
    );
}
