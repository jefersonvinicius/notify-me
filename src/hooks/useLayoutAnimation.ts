import {useEffect, useCallback} from 'react';
import {LayoutAnimation, UIManager} from 'react-native';

type TypeAnimation = 'opacity' | 'easeInEaseOut';

export default function useLayoutAnimation() {
  useEffect(() => {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const configureNextAnimation = useCallback((type: TypeAnimation) => {
    if (type === 'opacity') {
      LayoutAnimation.configureNext({
        create: {
          type: LayoutAnimation.Types.linear,
          property: LayoutAnimation.Properties.opacity,
        },
        delete: {
          type: LayoutAnimation.Types.linear,
          duration: 50,
          property: LayoutAnimation.Properties.opacity,
        },
        duration: 500,
      });
    }
    if (type === 'easeInEaseOut') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }
  }, []);

  return configureNextAnimation;
}
