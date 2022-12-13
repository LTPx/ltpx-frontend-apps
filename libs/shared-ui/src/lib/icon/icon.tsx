import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "../../assets/selection.json";

export function Icon(props: IconProps) {
  return (
    <IcoMoon iconSet={iconSet} {...props} />
  )
}
export default Icon;
