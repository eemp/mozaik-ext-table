import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableIcon from 'react-icons/lib/fa/table'
import format from 'string-format';

import { Widget, WidgetHeader, WidgetBody } from '@mozaik/ui'

import './Table.css';

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
          <div className="sheets sheets_list">
            <ul className="sheets__table">
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
      const headerClass = headerText.replace(/[\W]+/g, '-');
      return (
        <span className={`sheets__table-header ${headerClass}`}>
          {headerText}
        </span>
      );
    });
    return (
      <lh className="sheets__table-item sheets__table-headers">
        {headers}
      </lh>
    );
  }
}

class TableRow extends React.Component {
  render() {
    const {fields, data} = this.props;
    const row = _.map(fields, (field, fieldIndex) => {
      const fieldName = _.get(_.keys(field), 0);
      const fieldId = slugify(fieldName);
      const fieldValueTemplate = _.get(field, fieldName);
      const formattedFieldValue = format(fieldValueTemplate, data);
      return <span key={`field-${fieldId}`}>{formattedFieldValue}</span>;
    });
    return <li className="sheets__table-item">{row}</li>;
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

