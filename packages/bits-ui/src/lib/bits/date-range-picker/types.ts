import type {
	OnChangeFn,
	PrimitiveDivAttributes,
	WithAsChild,
	Without,
} from "$lib/internal/types.js";
import type { EditableSegmentPart } from "$lib/shared/date/field/types.js";
import type { DateMatcher, Granularity, WeekStartsOn } from "$lib/shared/date/types.js";
import type { DateRange } from "$lib/shared/index.js";
import type { CalendarRootSnippetProps } from "$lib/types.js";
import type { DateValue } from "@internationalized/date";
import type { Snippet } from "svelte";

export type DateRangePickerRootPropsWithoutHTML = WithAsChild<{
	/**
	 * The value of the date picker.
	 *
	 * @bindable
	 */
	value?: DateRange;

	/**
	 * A callback function called when the value changes.
	 */
	onValueChange?: OnChangeFn<DateRange>;

	/**
	 * The placeholder value of the date field. This determines the format
	 * and what date the field starts at when it is empty.
	 * @bindable
	 */
	placeholder?: DateValue;

	/**
	 * A callback function called when the placeholder value changes.
	 */
	onPlaceholderChange?: OnChangeFn<DateValue>;

	/**
	 * The open state of the date picker popover.
	 *
	 * @bindable
	 */
	open?: boolean;

	/**
	 * A callback function called when the open state changes.
	 */
	onOpenChange?: OnChangeFn<boolean>;

	/**
	 * A function that returns true if the given date is unavailable,
	 * where if selected, the date field will be marked as invalid.
	 */
	isDateUnavailable?: DateMatcher;

	/**
	 * A function that returns true if the given date is disabled,
	 * which makes the date unable to be selected in the calendar.
	 */
	isDateDisabled?: DateMatcher;

	/**
	 * The minimum acceptable date. When provided, the date field
	 * will be marked as invalid if the user enters a date before this date.
	 */
	minValue?: DateValue | undefined;

	/**
	 * The maximum acceptable date. When provided, the date field
	 * will be marked as invalid if the user enters a date after this date.
	 */
	maxValue?: DateValue | undefined;

	/**
	 * If true, the date field will be disabled and users will not be able
	 * to interact with it. This also disables the hidden input element if
	 * the date field is used in a form.
	 *
	 * @defaultValue false
	 */
	disabled?: boolean;

	/**
	 * If true, the date field will be readonly, and users will not be able to
	 * edit the values of any of the individual segments.
	 *
	 * @defaultValue false
	 */
	readonly?: boolean;

	/**
	 * An array of segment names that should be readonly. If provided, only the
	 * segments not in this array will be editable.
	 */
	readonlySegments?: EditableSegmentPart[];

	/**
	 * The format to use for displaying the time in the input.
	 * If using a 12 hour clock, ensure you also include the `dayPeriod`
	 * segment in your input to ensure the user can select AM/PM.
	 *
	 * @defaultValue the locale's default time format
	 */
	hourCycle?: 12 | 24;

	/**
	 * The locale to use for formatting the date field.
	 *
	 * @defaultValue 'en'
	 */
	locale?: string;

	/**
	 * The granularity of the date field. This determines which
	 * segments will be includes in the segments array used to
	 * build the date field.
	 *
	 * By default, when a `CalendarDate` value is used, the granularity
	 * will default to `'day'`, and when a `CalendarDateTime` or `ZonedDateTime`
	 * value is used, the granularity will default to `'minute'`.
	 *
	 * Granularity is only used for visual purposes, and does not impact
	 * the value of the date field. You can have the same value synced
	 * between multiple date fields with different granularities and they
	 * will all contain the same value.
	 *
	 * @defaultValue 'day'
	 */
	granularity?: Granularity;

	/**
	 * Whether or not to hide the timeZoneName segment from the date field.
	 *
	 * @defaultValue false;
	 */
	hideTimeZone?: boolean;

	/**
	 * Whether or not the hidden input of the date field requires a value
	 * to be submitted.
	 *
	 * @defaultValue false
	 */
	required?: boolean;

	/**
	 * Applicable only when `numberOfMonths` is greater than 1.
	 *
	 * Controls whether to use paged navigation for the next and previous buttons in the
	 * date picker. With paged navigation set to `true`, clicking the next/prev buttons
	 * changes all months in view. When set to `false`, it shifts the view by a single month.
	 *
	 * For example, with `pagedNavigation` set to `true` and 2 months displayed (January and
	 * February), clicking the next button changes the view to March and April. If `pagedNavigation`
	 * is `false`, the view shifts to February and March.
	 *
	 * @defaultValue false
	 */
	pagedNavigation?: boolean;

	/**
	 * The day of the week to start the calendar on, which must
	 * be a number between 0 and 6, where 0 is Sunday and 6 is
	 * Saturday.
	 *
	 * @defaultValue 0 (Sunday)
	 */
	weekStartsOn?: WeekStartsOn;

	/**
	 * How the string representation of the weekdays provided via the `weekdays` state store
	 * should be formatted.
	 *
	 * ```md
	 * - "long": "Sunday", "Monday", "Tuesday", etc.
	 * - "short": "Sun", "Mon", "Tue", etc.
	 * - "narrow": "S", "M", "T", etc.
	 *```
	 *
	 * @defaultValue "narrow"
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#weekday
	 */
	weekdayFormat?: Intl.DateTimeFormatOptions["weekday"];

	/**
	 * Display 6 weeks per month, regardless the month's number of weeks.
	 * This is useful for displaying a consistent calendar, where the size
	 * of the calendar doesn't change month to month.
	 *
	 * To display 6 weeks per month, you will need to render out the previous
	 * and next month's dates in the calendar as well.
	 *
	 * @defaultValue false
	 */
	fixedWeeks?: boolean;

	/**
	 * Determines the number of months to display on the calendar simultaneously.
	 * For navigation between months, refer to the `pagedNavigation` prop.
	 *
	 * @defaultValue 1
	 */
	numberOfMonths?: number;

	/**
	 * This label is exclusively used for accessibility, remaining hidden from the page.
	 * It's read by screen readers when the calendar is opened. The current month and year
	 * are automatically appended to the label, so you only need to provide the base label.
	 *
	 * For instance:
	 * - 'Date of birth' will be read as 'Date of birth, January 2021' if the current month is January 2021.
	 * - 'Appointment date' will be read as 'Appointment date, January 2021' if the current month is January 2021.
	 * - 'Booking date' will be read as 'Booking date, January 2021' if the current month is January 2021.
	 */
	calendarLabel?: string;

	/**
	 * Whether to disable the selection of days outside the current month. By default,
	 * days outside the current month are rendered to fill the calendar grid, but they
	 * are not selectable. Setting this prop to `true` will disable this behavior.
	 *
	 * @defaultValue false
	 */
	disableDaysOutsideMonth?: boolean;

	/**
	 * Whether or not users can deselect a date once selected
	 * without selecting another date.
	 *
	 * @defaultValue false
	 */
	preventDeselect?: boolean;

	/**
	 * Whether to close the popover when a date range is selected.
	 *
	 * @defaultValue true
	 */
	closeOnRangeSelect?: boolean;
}>;

export type DateRangePickerRootProps = DateRangePickerRootPropsWithoutHTML &
	Without<PrimitiveDivAttributes, DateRangePickerRootPropsWithoutHTML>;

export type {
	PopoverTriggerPropsWithoutHTML as DateRangePickerTriggerPropsWithoutHTML,
	PopoverTriggerProps as DateRangePickerTriggerProps,
	PopoverContentPropsWithoutHTML as DateRangePickerContentPropsWithoutHTML,
	PopoverContentProps as DateRangePickerContentProps,
	PopoverArrowPropsWithoutHTML as DateRangePickerArrowPropsWithoutHTML,
	PopoverArrowProps as DateRangePickerArrowProps,
	PopoverClosePropsWithoutHTML as DateRangePickerClosePropsWithoutHTML,
	PopoverCloseProps as DateRangePickerCloseProps,
} from "$lib/bits/popover/types.js";

export type {
	DateRangeFieldInputPropsWithoutHTML as DateRangePickerInputPropsWithoutHTML,
	DateRangeFieldInputProps as DateRangePickerInputProps,
	DateRangeFieldLabelPropsWithoutHTML as DateRangePickerLabelPropsWithoutHTML,
	DateRangeFieldLabelProps as DateRangePickerLabelProps,
	DateRangeFieldSegmentPropsWithoutHTML as DateRangePickerSegmentPropsWithoutHTML,
	DateRangeFieldSegmentProps as DateRangePickerSegmentProps,
} from "$lib/bits/date-range-field/types.js";

export type DateRangePickerCalendarPropsWithoutHTML = Omit<
	WithAsChild<{}, CalendarRootSnippetProps>,
	"children"
> & {
	children?: Snippet<[CalendarRootSnippetProps]>;
};

export type DateRangePickerCalendarProps = DateRangePickerCalendarPropsWithoutHTML &
	Without<PrimitiveDivAttributes, DateRangePickerCalendarPropsWithoutHTML>;

export type {
	RangeCalendarCellPropsWithoutHTML as DateRangePickerCellPropsWithoutHTML,
	RangeCalendarCellProps as DateRangePickerCellProps,
	RangeCalendarDayPropsWithoutHTML as DateRangePickerDayPropsWithoutHTML,
	RangeCalendarDayProps as DateRangePickerDayProps,
	RangeCalendarGridPropsWithoutHTML as DateRangePickerGridPropsWithoutHTML,
	RangeCalendarGridProps as DateRangePickerGridProps,
	RangeCalendarGridBodyPropsWithoutHTML as DateRangePickerGridBodyPropsWithoutHTML,
	RangeCalendarGridBodyProps as DateRangePickerGridBodyProps,
	RangeCalendarGridHeadPropsWithoutHTML as DateRangePickerGridHeadPropsWithoutHTML,
	RangeCalendarGridHeadProps as DateRangePickerGridHeadProps,
	RangeCalendarGridRowPropsWithoutHTML as DateRangePickerGridRowPropsWithoutHTML,
	RangeCalendarGridRowProps as DateRangePickerGridRowProps,
	RangeCalendarHeadCellPropsWithoutHTML as DateRangePickerHeadCellPropsWithoutHTML,
	RangeCalendarHeadCellProps as DateRangePickerHeadCellProps,
	RangeCalendarHeaderPropsWithoutHTML as DateRangePickerHeaderPropsWithoutHTML,
	RangeCalendarHeaderProps as DateRangePickerHeaderProps,
	RangeCalendarHeadingPropsWithoutHTML as DateRangePickerHeadingPropsWithoutHTML,
	RangeCalendarHeadingProps as DateRangePickerHeadingProps,
	RangeCalendarNextButtonPropsWithoutHTML as DateRangePickerNextButtonPropsWithoutHTML,
	RangeCalendarNextButtonProps as DateRangePickerNextButtonProps,
	RangeCalendarPrevButtonPropsWithoutHTML as DateRangePickerPrevButtonPropsWithoutHTML,
	RangeCalendarPrevButtonProps as DateRangePickerPrevButtonProps,
} from "$lib/bits/range-calendar/types.js";
