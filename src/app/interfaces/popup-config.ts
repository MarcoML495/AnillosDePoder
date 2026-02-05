import { ButtonSeverity } from "primeng/button";

export interface PopupConfig {
    message: string,
    buttonName: string,
    severity: ButtonSeverity,

    function: () => void
}
