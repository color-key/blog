import React from 'react';
import SvgIcon,{SvgIconProps} from '@material-ui/core/SvgIcon';

export default (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox={'0 0 1024 1024'}>
      <path d="M512 256c161.696 0 305.92 90.88 376.32 234.656A416.864 416.864 0 0 1 512 725.344c-161.696 0-305.92-90.88-376.32-234.688A416.864 416.864 0 0 1 512 256m0-85.344c-213.344 0-395.52 132.704-469.344 320 73.824 187.328 256 320 469.344 320s395.52-132.672 469.344-320c-73.824-187.296-256-320-469.344-320zM512 384a106.72 106.72 0 0 1 0 213.344A106.72 106.72 0 0 1 512 384m0-85.344c-105.824 0-192 86.208-192 192 0 105.824 86.176 192 192 192s192-86.176 192-192c0-105.792-86.176-192-192-192z" />
   </SvgIcon>
  )
}