class DateUtils {

    static dateTimeToString(date: string) {
        return date.replace('T',' ').substring(0, 19)
    }

}

export default DateUtils;