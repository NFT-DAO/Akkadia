import React from 'react'

export const useRefCallback = (callback) => {
  const onSetRef = React.useCallback((node) => {
    if (node) {
      callback(node)
    }

    // note: we assume the callback doesn't change, and is called whenever the ref changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return onSetRef
}
