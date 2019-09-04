import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaTable as TableIcon } from 'react-icons/fa'
import format from 'string-format';

import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

const styles = {
  table: {
    padding: '0 1rem 0 1rem',
  },
  header: {
    borderBottom: '1px dashed',
    fontWeight: 700,
    marginRight: '50px',
  },
  row: {
    display: 'flex',
    padding: '5px 0 5px 0',
  },
  col: {
    flex: 1,
  },
};

class Table extends Component {
  static getApiRequest(props) {
    return {
      id: `table.list.${props.title}`,
      params: {
        title: props.title,
        path: props.path,
        url: props.url,
      }
    };
  }

  render() {
    const {apiData, fields, title} = this.props;

    const headers = <TableHeaders fields={fields}/>;
    const rows = _.map(apiData, (rowData, rowIndex) => {
      return <TableRow key={rowIndex} fields={fields} data={rowData}/>;
    });

    return (
      <Widget>
        <WidgetHeader title={title} icon={TableIcon} />
        <WidgetBody>
          <div style={styles.table}>
            <ul>
              {headers}
              {rows}
            </ul>
          </div>
        </WidgetBody>
      </Widget>
    );
  }
}

Table.displayName = 'Table';

Table.propTypes = {
  apiData: PropTypes.array.isRequired,
  fields: PropTypes.array.isRequired,
  path:  PropTypes.string,
  title: PropTypes.string.isRequired,
  url:   PropTypes.string,
};

Table.defaultProps = {
  headers: ['A', 'B', 'C', 'D'],
  fields: ['{A}', '{B}', '{C}', '{D}'],
  title: 'Table',
};

export default Table;

class TableHeaders extends React.Component {
  render() {
    const {fields} = this.props;
    const headers = _.map(fields, field => {
      const headerText = _.get(_.keys(field), 0);
      return (
        <span style={_.assign({}, styles.header, styles.col)}>
          {headerText}
        </span>
      );
    });
    return (
      <lh style={styles.row}>
        {headers}
      </lh>
    );
  }
}

TableHeaders.propTypes = {
  fields: PropTypes.array.isRequired,
};

class TableRow extends React.Component {
  render() {
    const {fields, data} = this.props;
    const row = _.map(fields, field => {
      const fieldName = _.get(_.keys(field), 0);
      const fieldId = slugify(fieldName);
      const fieldValueTemplate = _.get(field, fieldName);
      const formattedFieldValue = format(fieldValueTemplate, data);
      return <span style={styles.col} key={`field-${fieldId}`}>{formattedFieldValue}</span>;
    });
    return <li style={styles.row}>{row}</li>;
  }
}

TableRow.propTypes = {
  data: PropTypes.object.isRequired,
  fields: PropTypes.array.isRequired,
};

// TODO: don't be lazy, just npm install something?
function slugify(text) {
  return text
    .replace(/[\W]+/g, ' ')
    .trim()
    .replace(' ', '-');
}

