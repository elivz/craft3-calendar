<?php

namespace Solspace\Calendar\FieldTypes;

use craft\base\ElementInterface;
use craft\base\Field;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Models\CalendarModel;
use yii\db\Schema;

class CalendarFieldType extends Field
{
    /**
     * @inheritDoc
     */
    public static function displayName(): string
    {
        return Calendar::t('Calendar Calendars');
    }

    /**
     * @inheritDoc
     */
    public static function defaultSelectionLabel(): string
    {
        return Calendar::t('Add a calendar');
    }

    /**
     * @inheritDoc
     */
    public function getContentColumnType(): string
    {
        return Schema::TYPE_INTEGER;
    }

    /**
     * @inheritdoc
     */
    protected function optionsSettingLabel(): string
    {
        return Calendar::t('Calendar Options');
    }

    /**
     * @inheritDoc IFieldType::getInputHtml()
     *
     * @param mixed                 $value
     * @param ElementInterface|null $element
     *
     * @return string
     */
    public function getInputHtml($value, ElementInterface $element = null): string
    {
        $calendars = Calendar::getInstance()->calendars->getAllAllowedCalendars();

        $calendarOptions = [
            '' => Calendar::t('Select a calendar'),
        ];

        /** @var CalendarModel $calendar */
        foreach ($calendars as $calendar) {
            if (\is_array($calendar)) {
                $calendarOptions[(int) $calendar['id']] = $calendar['name'];
            } else if ($calendar instanceof CalendarModel) {
                $calendarOptions[(int) $calendar->id] = $calendar->name;
            }
        }

        return \Craft::$app->view->renderTemplate(
            'calendar/_components/fieldTypes/calendar',
            [
                'name'             => $this->handle,
                'calendars'        => $calendars,
                'calendarOptions'  => $calendarOptions,
                'selectedCalendar' => $value instanceof CalendarModel ? $value->id : null,
            ]
        );
    }

    /**
     * @return array
     */
    public static function supportedTranslationMethods(): array
    {
        return [];
    }

    /**
     * @param ElementInterface|null $element
     *
     * @return bool
     */
    public function getIsTranslatable(ElementInterface $element = null): bool
    {
        return false;
    }

    /**
     * @inheritDoc
     */
    public function serializeValue($value, ElementInterface $element = null)
    {
        if ($value instanceof CalendarModel) {
            return $value->id;
        }

        return parent::serializeValue($value, $element);
    }

    /**
     * @inheritDoc
     */
    public function normalizeValue($value, ElementInterface $element = null)
    {
        if ($value instanceof CalendarModel) {
            return $value;
        }

        return Calendar::getInstance()->calendars->getCalendarById((int) $value);
    }
}
