import { ACCOUNT_TYPES } from "../../../utils/accountTypes";
import AccountType from "./AccountType";
import LoginInfo from "./LoginInfo";
import UserInfo from "./UserInfo";
import VerifyOTP from "./VerifyOTP";

export class RegistrationSteps {
    #allSteps = [
        {
            title: "Register",
            subtitle: "It's quick and Easy",
            component: <LoginInfo />
        },
        {
            title: "User Info",
            subtitle: "A little bit about yourself",
            component: <UserInfo />
        },
        {
            title: "Account Type",
            subtitle: "who are You?",
            component: <AccountType />
        },
    ];

    #verificationStep = {
        title: "Verification",
        subtitle: "Enter OTP",
        component: <VerifyOTP />
    };

    #creatorRegistrationSteps = [
        {
            title: "Account Info",
            subtitle: "Add Primary Account Information",
            component: <></>
        },
        {
            title: "Creator Detail Info",
            subtitle: "Spice it up before launching",
            component: <></>
        }
    ];

    #studioRegistrationSteps = [
        {
            title: "Account Info",
            subtitle: "Add Primary Account Information",
            component: <></>
        },
        {
            title: "Studio Detail Info",
            subtitle: "Spice it up before launching",
            component: <></>
        }
    ];

    #projectOwnerRegistrationSteps = [
        {
            title: "Account Info",
            subtitle: "Add Primary Account Information",
            component: <></>
        },
        {
            title: "Project Owner Detail Info",
            subtitle: "Spice it up before launching",
            component: <></>
        }
    ];

    addVerificationStep() {
        this.#allSteps.splice(1, 0, this.#verificationStep);
    };

    removeVerificationStep() {
        let index = this.#allSteps.indexOf(this.#verificationStep);
        if (index > -1) {
            this.#allSteps.splice(index, 1);
        }
    }

    addSpecificRegistrationSteps(account_type) {

        switch (account_type) {
            case ACCOUNT_TYPES.Creator:
                this.#allSteps.push(...this.#creatorRegistrationSteps);
                break;

            case ACCOUNT_TYPES.Studio:
                this.#allSteps.push(...this.#studioRegistrationSteps);
                break;

            case ACCOUNT_TYPES.ProductOwner:
                this.#allSteps.push(...this.#projectOwnerRegistrationSteps);
                break;

            default:
                break;
        }
    };

    getAllsteps() {
        return this.#allSteps;
    };

    getLength() {
        return this.#allSteps.length;
    }

};