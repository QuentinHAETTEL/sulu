// @flow
import log from 'loglevel';
import moment from 'moment-timezone';
import DateTimeFieldTransformer from '../../fieldTransformers/DateTimeFieldTransformer';

beforeEach(() => {
    moment.tz.setDefault('Europe/Vienna');
});

const dateTimeFieldTransformer = new DateTimeFieldTransformer();

jest.mock('loglevel', () => ({
    error: jest.fn(),
}));

jest.mock('../../../../utils/Translator', () => ({
    translate: jest.fn((key) => key),
}));

test('Test undefined', () => {
    expect(dateTimeFieldTransformer.transform(undefined)).toBe(null);
});

test('Test invalid format', () => {
    expect(dateTimeFieldTransformer.transform('xxx')).toBe(null);
    expect(log.error).toBeCalledWith('Invalid date given: "xxx". Format needs to be in "ISO 8601"');
});

test('Test valid example', () => {
    expect(dateTimeFieldTransformer.transform('2018-03-10T14:09:04+01:00')).toBe('March 10, 2018 2:09 PM');
});
