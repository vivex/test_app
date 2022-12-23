import styles from "../styles/Common.module.css";

type TwoPaneLayoutProps = {
  children: JSX.Element[];
};

export function TwoPaneLayout({ children }: TwoPaneLayoutProps) {
  return (
    <div className={styles.twoPaneWrapper}>
      <div className={styles.leftPane}>{children[0]}</div>
      <div className={styles.rightPane}>{children[1]}</div>
    </div>
  );
}
