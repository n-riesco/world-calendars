var calendars = require('../dist');

var dflt = calendars.instance();

var gregorianTestDates =         [
    [1900, 1, 1],
    [1901, 12, 31],
    [1904, 2, 29],
    [100, 7, 4],
    [1999, 12, 31],
    [2000, 1, 1],
    [9999, 12, 31],
    [13, 11, 5],
    [1, 1, 1],

    // negative years
    // TODO: javascript *does* have a year 0 (uses ISO-8601:2004),
    // kbwood/calendars *doesn't* (uses BCE/CE), so intervals that
    // cross this boundary get confused about how many years intervene,
    // although the two report the same year *number*
    // Some authors get around this by saying year 0 is 1 BCE,
    // year -1 is 2 BCE, etc... should we attempt to change that
    // correspondence in kbwood/calendars or ignore?
    [-1, 12, 31],
    [-13, 8, 19],
    [-292, 4, 8],
    [-9999, 1, 1]
];

describe('Default calendar', function() {

    it('should be a Gregorian calendar in US English', function() {
        expect(dflt.name).toBe('Gregorian');
        expect(dflt.local.monthNamesShort).toEqual([
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ])
        expect(dflt.local.dateFormat).toBe('mm/dd/yyyy');
    });

    it('should convert to/from JS Date and julian days', function() {
        gregorianTestDates.forEach(function(v) {
            var jsDate = new Date(2000, v[1] - 1, v[2]);
            // separately handle year so we get first century correct
            jsDate.setFullYear(v[0]);
            var cDate = dflt.fromJSDate(jsDate);

            // make sure we can clone new dates without mutation
            var cDate2 = cDate.fromJSDate(jsDate);
            expect(cDate2.compareTo(cDate)).toBe(0);
            expect(cDate2).not.toBe(cDate);
            var cDate3 = cDate.newDate(v[0], v[1], v[2]);
            expect(cDate3.compareTo(cDate)).toBe(0);
            expect(cDate3).not.toBe(cDate);

            // make sure we inherit the calendar correctly
            expect(cDate.calendar()).toBe(dflt);

            // make sure the javascript y/m/d are preserved
            expect(cDate.year()).toBe(v[0]);
            expect(cDate.month()).toBe(v[1]);
            expect(cDate.day()).toBe(v[2]);

            // check properties of this date
            expect(cDate.epoch()).toBe(v[0] > 0 ? 'CE' : 'BCE');
            expect(cDate.daysInYear()).toBe(cDate.leapYear() ? 366 : 365);

            // first century years don't convert correctly to javascript dates
            // Presumably this is because they use the new Date(y, m, d)
            // constructor but that makes toJSDate() useless if you want to
            // support this century. TODO: consider this a bug in the source?
            if(v[0] < 0 || v[0] > 99) {
                expect(cDate.toJSDate()).toEqual(jsDate);
            }

            // Dunno what to test about the julian day number, for now just
            // check that it's reversible
            expect(dflt.fromJD(cDate.toJD()).formatDate())
                .toBe(cDate.formatDate());
        });
    });
});

describe('World calendars', function() {
    it('should convert to and from gregorian', function() {
        // TODO: add more test dates to all calendars
        var gregorianDates = [[2016, 10, 31]];

        // TODO: these dates are just taken from the demo on
        // http://keith-wood.name/calendars.html
        // find some independent source to test them against
        var worldDates = {
            taiwan: [[105, 10, 31]],
            thai: [[2559, 10, 31]],
            julian: [[2016, 10, 18]],
            persian: [[1395, 8, 10]],
            islamic: [[1438, 1, 29]],
            ummalqura: [[1438, 1, 30]],
            hebrew: [[5777, 7, 29]],
            ethiopian: [[2009, 2, 21]],
            coptic: [[1733, 2, 21]],
            nepali: [[2073, 7, 15]],
            nanakshahi: [[548, 8, 17]],
            mayan: [[5203, 16, 10]],
            discworld: [[1841, 9, 28]]
        };

        var mayanYears = ['13.0.3'];

        gregorianDates.forEach(function(gNums, i) {
            var gDate = dflt.newDate(gNums[0], gNums[1], gNums[2]),
                gJD = gDate.toJD();

            Object.keys(worldDates).forEach(function(calName) {
                var cal = calendars.instance(calName),
                    calDates = worldDates[calName],
                    wNums,
                    wDate;

                // just testing the test, make sure we're not missing
                // any dates we should be testing
                expect(calDates.length).toBe(gregorianDates.length, calName);

                wNums = calDates[i];
                wDate = cal.newDate(wNums[0], wNums[1], wNums[2]);

                expect(wDate.toJD()).toEqual(gJD, calName);

                expect(cal.fromJD(gJD).formatDate()).toBe(wDate.formatDate(), calName);

                if(calName === 'mayan') {
                    expect(wDate.formatYear()).toBe(mayanYears[i]);
                }
            });
        });
    });

    // TODO: test localizations?
});