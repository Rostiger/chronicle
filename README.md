# Chronicle
Chronicle is a simple text-based timeline visualisation tool I created in an effort to better understand and know myself.
It creates multiple timeline timeline UI from text based data using [neauoire](https://github.com/neauoire)'s _Tablatal_ and  _Indental_ formats and parsers.

<img src="https://raw.githubusercontent.com/Rostiger/chronicle/master/chronicle.gif" />

Each lane represents one of the categories in the databox on the right. The black bar at the top displays the current year and month. Chronicle supports singular, continuous and ongoing events.

# Usage
The data is stored in `database/chronicle.tbtl` and uses the following format:
```
FROM     TO       CAT DESCRIPTION
2018 APR 2019 SEP PRO Event Description
```
`CAT` represents a category that must be defined in `database/settings.nbtl`
```
CATEGORIES
  ID
    NAME : TITLE
    COLOR : #HEXCODE
```
A single month is currently the smallest time unit Chronicle supports. Singular events can be added by omiting the `TO` parameter:
```
FROM     TO       CAT DESCRIPTION
2018 APR ---- --- PRO Event Description
```
Ongoing events can be declared by adding an asterisk at the beginning of the `TO` parameter:
```
FROM     TO       CAT DESCRIPTION
2018 APR *--- --- PRO Event Description
```
# Extras
- See the [License](https://github.com/Rostiger/chronicle/blob/master/LICENSE) file for license rights and limitations (MIT).
- Pull Requests are welcome!
