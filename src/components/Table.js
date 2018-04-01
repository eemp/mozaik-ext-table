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
    const {apiData, fields, headers, title} = this.props;

    const headerDisplay = _.map(headers, header => (
      <span className={`sheets__table-header ${header.replace(/[\W]/g, '-')}`}>{header}</span>
    ));
    const items = _.map(apiData, (rowFields, rowIndex) => {
      // Render fields
      const rowDisplay = _.map(fields || [], (fieldTemplate, fieldIndex) => {
        // NOTE: format() does not support extends
        const formattedField = format(fieldTemplate, rowFields);
        const fieldIdentifier = `field-${fieldIndex}`;
        return <span className={fieldIdentifier}>{formattedField}</span>;
      });
      return <li key={rowIndex} className="sheets__table-item">{rowDisplay}</li>;
    });

    return (
      <Widget>
        <WidgetHeader title={title} icon={TableIcon} />
        <WidgetBody>
          <div className="sheets sheets_list" ref={(c) => this._body = c}>
            <ul className="sheets__table">
              <lh className="sheets__table-item sheets__table-headers">
                {headerDisplay}
              </lh>
              {items}
            </ul>
          </div>
        </WidgetBody>
      </Widget>
    );
  }

}

Table.displayName = 'Table';

Table.propTypes = {
  fields: PropTypes.array,
  format: PropTypes.object,
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
