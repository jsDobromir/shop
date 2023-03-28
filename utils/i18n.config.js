const {I18n} = require('i18n');
const path = require('path');

const i18n = new I18n({
    locales: ['en', 'bg'],
    defaultLocale: 'bg',
    directory: path.join(__dirname, '../','locales'),
    objectNotation: true
});

module.exports = i18n;