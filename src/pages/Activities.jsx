import { useTranslation } from "react-i18next";

function Activities() {
  const { t } = useTranslation();

  return <div>{t("Activities")}</div>;
}

export default Activities;
