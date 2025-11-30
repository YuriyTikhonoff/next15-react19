import CircularProgress from "@mui/material/CircularProgress"

import styles from "./styles.module.scss"

const LoadingSpinner = () => {
  return (
    <div className={styles.container}>
      <CircularProgress />
    </div>
  )
}

export default LoadingSpinner
