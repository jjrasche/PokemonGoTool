Number.prototype.format2DigitString = function format2DigitString() {
	if (this >= 0 && this < 10) {
		return '0' + String(this);
	}
	return String(this);
}