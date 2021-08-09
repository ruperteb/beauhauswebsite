import * as React from 'react';
import { Query, Item } from "../../schematypes/schematypes"



interface Props {
  antique: Item
  key: any
}

export const AntiquesListItem: React.FunctionComponent<Props> = ({ antique }) => {


  return (
    <div style={{ marginTop: 180, zIndex: 0 }}>
      {antique.name}
      

    </div>

  );
};

export default AntiquesListItem