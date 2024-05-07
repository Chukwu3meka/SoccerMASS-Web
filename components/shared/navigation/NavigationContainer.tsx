import routes from "utils/routes";

import { Navigation } from ".";
import { NavigationContainerProps } from "interfaces/components/others/shared.interface";

const NavigationContainer = ({ research }: NavigationContainerProps) => {
  const navRoutes = routes.filter((props) => props.research === research);

  return <Navigation routes={navRoutes} />;
};

export default NavigationContainer;
