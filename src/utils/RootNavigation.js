/**
 * Based on https://reactnavigation.org/docs/navigating-without-navigation-prop/
 * access navigation actions from anywhere props are not defined
 */

import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}